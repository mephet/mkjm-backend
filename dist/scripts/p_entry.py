import pandas as pd
from pulp import *
from poptimization import *
import numpy as np

client = {
    'UT Code': ['UT2475', 'UT3499', 'UT2948', 'UT3325', 'UT3297'],
    'Frozen (Y/N)': ['N', 'N', 'N', 'N', 'N'],
    'Fund Allocation': [0.4, 0.19, 0.12, 0.15, 0.14]
}

model = {
    'CIP': [3],
    'AXJ_EQ': [0.037696],
    'CN_HK_EQ': [0.0212],
    'EUXUK_EQ': [0.1762],
    'INC_EM_BOND': [0.3012],
    'JP_EQ': [0.3059],
    'THEMATIC_EQ': [0.1021],
    'UK_EQ': [0.0557]
}

fund = {
    'UT Code': ['UT1038', 'UT1223', 'UT1499', 'UT1675', 'UT2475', 'UT3499', 'UT2948', 'UT3325', 'UT3297'],
    'AXJ_EQ': [0, 0, 0, 0.22, 0.64, 0, 0, 0, 0],
    'CN_HK_EQ': [0, 0, 0, 0.78, 0.36, 0, 0, 0, 0],
    'EUXUK_EQ': [0, 0.22, 0, 0, 0, 0, 0, 0.76, 0],
    'INC_ALTV': [0, 0, 0, 0, 0, 0, 0, 0, 0],
    'INC_DMHY_BOND': [0, 0, 0, 0, 0, 0, 0, 0, 0],
    'INC_DMIG_BOND': [0, 0, 0, 0, 0, 0, 0, 0, 0],
    'INC_EM_BOND': [0, 0, 0, 0, 0, 0, 1, 0, 0], 
    'JP_EQ': [0, 0, 0, 0, 0, 0, 0, 0, 1], 
    'NA_EQ': [0, 0.78, 1, 0, 0, 0, 0, 0, 0], 
    'OTHER_EM_EQ': [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    'THEMATIC_EQ': [1, 0, 0, 0, 0, 1, 0, 0, 0], 
    'THEMATIC_OTHER': [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    'UK_EQ': [0, 0, 0, 0, 0, 0, 0, 0.24, 0]
}

client_df = pd.DataFrame(client, columns = ['UT Code', 'Fund Name', 'Frozen (Y/N)', 'Fund Allocation'])
model_df = pd.DataFrame(model, columns=['CIP', 'AXJ_EQ', 'CN_HK_EQ', 'EUXUK_EQ', 'INC_ALTV', 'INC_DMHY_BOND', 'INC_DMIG_BOND', 'INC_EM_BOND', 'JP_EQ', 'NA_EQ', 'OTHER_EM_EQ', 'THEMATIC_EQ', 'THEMATIC_OTHER', 'UK_EQ'])
fund_df = pd.DataFrame(fund, columns=['UT Code', 'AXJ_EQ', 'CN_HK_EQ', 'EUXUK_EQ', 'INC_ALTV', 'INC_DMHY_BOND', 'INC_DMIG_BOND', 'INC_EM_BOND', 'JP_EQ', 'NA_EQ', 'OTHER_EM_EQ', 'THEMATIC_EQ', 'THEMATIC_OTHER', 'UK_EQ'])
print(client_df)
model_df = model_df.replace(np.nan, 0)
print(model_df)
print(fund_df)

fund_len = len(fund_df['UT Code'])
ac_len = len(model_df.iloc[0, 1:])

print("Number of funds: " + str(fund_len) + " Number of asset classes:" + str(ac_len))

AUM_TURNOVER = 0.3,
WEIGHT_SUM_GAPS = 0.8
WEIGHT_NUM_TXNS = 1 - WEIGHT_SUM_GAPS
NORMALIZE_SUM_GAPS = 1
NORMALIZE_NUM_TXNS = 1/12

op = OptimizationProblem(client_df, fund_df, model_df, ac_len, fund_len)
op.construct_problem(LpMinimize)
op.set_objective(WEIGHT_SUM_GAPS, WEIGHT_NUM_TXNS, NORMALIZE_SUM_GAPS, NORMALIZE_NUM_TXNS)

op.solve_problem()
ac_out = op.export_ac_output()
fund_out = op.export_fund_output()

print(fund_out)
