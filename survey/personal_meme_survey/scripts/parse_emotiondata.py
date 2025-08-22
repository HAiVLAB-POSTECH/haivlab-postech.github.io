import pandas as pd
import json
import re
from collections import defaultdict

# Load the CSV file
df = pd.read_csv("survey_result.csv")

# Step 1: Parse EmotionData JSON
df_filtered = df[df["EmotionData"].notnull()].copy()
parsed_data = []
meta_data = []

for idx, row in df_filtered.iterrows():
    try:
        emotion_json = json.loads(row["EmotionData"])
        if emotion_json == {}:
            continue
        # Replace false with None
        emotion_json = {k: (None if v is False else v) for k, v in emotion_json.items()}
        parsed_data.append(emotion_json)
        meta_data.append({
            "userId": row["userId"],
            "gender": row.get("gender"),
            "age": row.get("age"),
            "timeStamp": row.get("timeStamp"),
            "knownPeriod": row.get("knownPeriod")
        })
    except (json.JSONDecodeError, TypeError):
        continue

# Step 2: Build DataFrame
emotion_df = pd.DataFrame(parsed_data)
meta_df = pd.DataFrame(meta_data)
final_df = pd.concat([meta_df, emotion_df], axis=1)

# Step 3: Drop all-NaN or all-{} columns
cols_to_drop = []
for col in final_df.columns:
    non_null_values = final_df[col].dropna()
    if all(val == {} for val in non_null_values):
        cols_to_drop.append(col)
final_df.drop(columns=cols_to_drop, inplace=True)
final_df.dropna(axis=1, how="all", inplace=True)

# Step 4: Ensure userId 1 to 32 exist
full_user_ids = pd.DataFrame({'userId': range(1, 33)})
final_df = pd.merge(full_user_ids, final_df, on='userId', how='left')

# Step 5: Add missing *_experience_*_known_level_1~4 columns
emotions = ["angry", "annoy", "happy", "mad", "surprise", "chamad", "satis", "excited"]

for prefix in ["send_experience", "recv_experience"]:
    for emotion in emotions:
        for level in range(1, 5):
            col_name = f"{prefix}_{emotion}_known_level_{level}"
            if col_name not in final_df.columns:
                final_df[col_name] = pd.NA  # Add missing column as null

# Step 6: Group columns by emotion type
base_cols = ['userId', 'gender', 'age', 'timeStamp', 'knownPeriod']
emotion_cols = [col for col in final_df.columns if col not in base_cols]

def extract_emotion_key(colname):
    match = re.search(r'(angry|annoy|happy|mad|surprise|chamad|satis|excited)', colname)
    return match.group(1) if match else 'zzz_other'

grouped_cols = defaultdict(list)
for col in emotion_cols:
    key = extract_emotion_key(col)
    grouped_cols[key].append(col)

sorted_emotion_cols = []
for key in sorted(grouped_cols.keys()):
    sorted_emotion_cols.extend(sorted(grouped_cols[key]))

# Apply final column order
ordered_cols = base_cols + sorted_emotion_cols
final_df = final_df[ordered_cols]

# Step 7: Read key order from key_order.txt
try:
    with open("key_order.txt", "r", encoding="utf-8") as f:
        key_order = [line.strip() for line in f if line.strip()]
except FileNotFoundError:
    print("❌ key_order.txt not found. Falling back to default sort.")
    key_order = final_df.columns.tolist()

# Step 8: Add any missing keys from key_order.txt as blank columns
for key in key_order:
    if key not in final_df.columns:
        final_df[key] = pd.NA  # Fill missing keys with nulls

# Step 9: Keep only the keys listed in key_order (and remove others)
ordered_cols = [col for col in key_order if col in final_df.columns]

# Step 10: Ensure userId is NOT index
if final_df.index.name == "userId":
    final_df.reset_index(inplace=True)

# Step 11: Reorder the columns
final_df = final_df[ordered_cols]

transposed_df = final_df.transpose()

# Save to CSV
transposed_df.to_csv("emotion_data.csv")
print("Saved to 'emotion_data.csv'.")