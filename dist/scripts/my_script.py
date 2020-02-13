import json
import pandas as pd

json_input = json.loads(input())

client_df = pd.DataFrame.from_dict(json_input['clientJson'])
model_df = pd.DataFrame(json_input['modelJson'], index=[0])
fund_df = pd.DataFrame.from_dict(json_input['fundJson'])

print(client_df)
print(model_df)
print(fund_df)