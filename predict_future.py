import joblib
import json
import numpy as np
import sys

# Load the model
model = joblib.load('random_forest_model.pkl')

# Get input data from Node.js
input_data = json.loads(sys.argv[1])
input_array = np.array(input_data)

# Make predictions
predictions = model.predict(input_array)

# Output predictions
print(predictions.tolist())  # Send predictions back to Node.js
