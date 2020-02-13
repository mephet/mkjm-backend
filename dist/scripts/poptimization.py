import pandas as pd
import functools
import numpy as np  
from pulp import *

class OptimizationProblem:

    def __init__(self, client_df, fund_df, model_df, ac_len, fund_len):
        self.fund_list = fund_df['Fund Name']
        self.ac_len = ac_len
        self.fund_len = fund_len
        self.fund_df = fund_df.iloc[:, 1:].set_index(self.fund_list)
        self.model_df = model_df
        self.client_df = client_df
        self.client_fund_allocation = pd.Series([float(x) for x in client_df['Fund Allocation']], index=client_df['Fund Name'])
        self.c_df = pd.DataFrame(self.client_fund_allocation, columns=['Alloc'])
        self.frozen_status = pd.Series([str(x) for x in client_df['Frozen Status']], index=client_df['Fund Name'])
        self.f_df = pd.DataFrame(self.frozen_status, columns=['Frozen Status'])
        self.fund_df = self.merge_df(self.fund_df, self.c_df, 0)
        self.fund_df = self.merge_df(self.fund_df, self.f_df, 'N')
        self.ac_list = fund_df.columns[1:1 + ac_len]
        self.model_acs = model_df.iloc[0, 0:]

        self.fund_vars = []
        self.psi_vars = []
        self.chi_vars = []
        self.y_vars = []
        self.A = 20

        if (len(self.model_acs) != ac_len):
            print("AC len is different")
            return
    
    def merge_df(self, df1, df2, repl_val):
        merged_df = df1.merge(df2, how="left", left_index=True, right_index=True)
        merged_df = merged_df.replace(np.nan, repl_val)
        return merged_df

    def initialize_dict(self, index, init_val):
        o = {}
        for i in index:
            o[i] = init_val
        return o
    
    def __is_frozen(self, index):
        return self.fund_df['Frozen Status'].iloc[index] == 'Y'
    
    def __set_variables(self):
        for j in range(self.ac_len):
            chi = LpVariable("chi_" + str(j), None, None)
            self.chi_vars.append(chi)
        
        for i in range(self.fund_len):
            f = None
            if (self.__is_frozen(i)):
                f = LpVariable("FA_" + str(i), 0, 0)
            else:
                f = LpVariable("FA_" + str(i), -self.fund_df['Alloc'].iloc[i], 1 - self.fund_df['Alloc'].iloc[i])
            self.fund_vars.append(f)

            psi = LpVariable("psi_" + str(i), None, None)
            self.psi_vars.append(psi)

            y = LpVariable("y_" + str(i), 0, 1, LpInteger)
            self.y_vars.append(y)

    def construct_problem(self, lp_sense):
        self.optimization_model = LpProblem("Transaction Minimization Problem", lp_sense)
        self.__set_variables()
        self.__set_constraints()

    def __set_constraints(self):
        for i in range(self.fund_len):
            self.optimization_model += self.psi_vars[i] >= -self.fund_vars[i]
            self.optimization_model += self.psi_vars[i] >= self.fund_vars[i]
            self.optimization_model += self.psi_vars[i] <= self.A * self.y_vars[i]

        gac = [0 for i in range(self.ac_len)]
        for j in range(self.ac_len):
            for i in range(self.fund_len):
                gac[j] += (self.fund_df['Alloc'].iloc[i] + self.fund_vars[i]) * self.fund_df.iloc[i, j]

        for j in range(self.ac_len):
            self.optimization_model += self.chi_vars[j] >= gac[j] - self.model_acs[j]
            self.optimization_model += self.chi_vars[j] >= -(gac[j] - self.model_acs[j])

        self.optimization_model += lpSum(self.fund_vars) == 0

    def set_objective(self, gaps_coeff, txn_coeff, norm_gaps, norm_txns):
        self.optimization_model += gaps_coeff * norm_gaps * lpSum(self.chi_vars) + txn_coeff * norm_txns * lpSum(self.y_vars)
    
    def solve_problem(self):
        self.optimization_model.solve()
        self.fund_delta = pd.Series([f.value() for f in self.fund_vars], index=self.fund_list)
        self.optimized_allocation = pd.Series([a + b for a, b in zip(self.fund_df['Alloc'], self.fund_delta)], index=self.fund_list)

    def export_ac_output(self):
        gap_distance = sum(c.value() for c in self.chi_vars)

        op_ac_exp = self.initialize_dict(self.ac_list, 0)
        for ac in self.ac_list:
            op_ac_exp[ac] = sum(self.fund_df[ac] * self.fund_df['Alloc'])
        op_ac_exp = pd.Series(op_ac_exp)

        ac_exposure = self.initialize_dict(self.ac_list, 0)
        for ac in self.ac_list:
            ac_exposure[ac] = sum(self.fund_df[ac] * self.fund_df["Alloc"])
        ac_exposure = pd.Series(ac_exposure)

        ac_output = {
            'Asset Class Names': [ac for ac in self.ac_list],
            'Initial AC Alloc': ac_exposure,
            'Optimized AC Alloc': op_ac_exp,
            'Target AC Alloc': self.model_acs
        }

        ac_output = pd.DataFrame(ac_output)
        return {'ac_output': ac_output, 'gap_dist': gap_distance}

    def export_fund_output(self):
        num_txns = sum(y.value() for y in self.y_vars)

        aum_turnover = functools.reduce(lambda a,b: abs(a) + abs(b), self.fund_delta)

        fund_allocation_output = {
            'Fund UT Codes': [fund for fund in self.fund_list],
            'Frozen Status': [f for f in self.fund_df['Frozen Status']],
            'Initial Allocation': [o for o in self.fund_df['Alloc']],
            'Optimized Allocation': self.optimized_allocation,
            'Allocation delta': [a for a in self.fund_delta],
            '# of txns': [int(txn.value()) for txn in self.y_vars]
        }

        fund_allocation_output = pd.DataFrame(fund_allocation_output)

        return ({ 'fund_output': fund_allocation_output, 'num_txns': num_txns, 'aum_turnover': aum_turnover})
