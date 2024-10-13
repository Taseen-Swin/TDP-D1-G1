import pandas as pd
import pyodbc
from datetime import datetime
print(pyodbc.drivers())

# Database connection parameters
server = 'localhost'  # e.g., 'localhost' or 'your_server_ip'
database = 'MalwareAnalysis'
username = 'sa'
password = 'Password123'
connection_string = f"DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}"


try:
    # Try to connect to the database
    with pyodbc.connect(connection_string) as conn:
        print("Connection successful!")
except Exception as e:
    print("Failed to connect:", e)


def convert_date(date_str):
    # Attempt to parse date, assuming it is in 'DD/MM/YYYY' or 'MM/DD/YYYY'
    for fmt in ("%d/%m/%Y %H:%M:%S", "%m/%d/%Y %H:%M:%S"):
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    raise ValueError(f"Date format not recognized for date string: {date_str}")    

    
# Function to insert data into the malware_data table
def insert_data_from_csv(csv_file):
    # Specify the columns to read from the CSV

    df = pd.read_csv(csv_file)
    # print("CSV Column Names:", df.columns.tolist())  # Debugging step
    columns_to_read = ['Flow ID', 'Source IP', 'Source Port', 'Destination IP', 'Destination Port', 'Protocol', 'Timestamp', 'Label', 'Type']

    # Read the CSV file and select only the specified columns
    #df = pd.read_csv(csv_file, usecols=columns_to_read)
    df.columns = df.columns.str.strip()

    df = df[columns_to_read]

    # Create a new column for is_malware based on the Type column
    df['is_malware'] = df['Type'].apply(lambda x: 0 if x == 'Benign' else 1)

    print("CSV Column Names:", df.columns.tolist()) 

    #Establish the database connection
    conn = pyodbc.connect(connection_string)
    cursor = conn.cursor()

    # Insert data into the table
    for index, row in df.iterrows():
        cursor.execute('''
            INSERT INTO MalwareAnalysis.dbo.malware_data (flow_id, source_ip, source_port, destination_ip, destination_port, protocol, [timestamp], label, [type], is_malware)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', 
        row['Flow ID'],
        row['Source IP'],
        row['Source Port'],
        row['Destination IP'],
        row['Destination Port'],
        row['Protocol'],
        convert_date(row["Timestamp"]),
        row['Label'],
        row['Type'],
        row['is_malware'])

    # Commit the transaction and close the connection
    conn.commit()
    cursor.close()
    conn.close()

# Call the function with your CSV file path
csv_file_path = 'newdata.csv'  # Replace with your actual CSV file path
insert_data_from_csv(csv_file_path)
