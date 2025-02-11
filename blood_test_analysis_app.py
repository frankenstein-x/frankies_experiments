
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import io

# Function to read file based on extension
def load_data(file):
    try:
        if file.name.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.name.endswith('.xlsx'):
            df = pd.read_excel(file)
        elif file.name.endswith('.txt'):
            df = pd.read_csv(file, delimiter='\t')
        else:
            st.error("Unsupported file type. Please upload a CSV, Excel, or TXT file.")
            return None
        return df
    except Exception as e:
        st.error(f"Error reading file: {str(e)}")
        return None

# Streamlit app starts here
st.title('Blood Test Analysis App')

# Step 1: Upload file
uploaded_file = st.file_uploader("Upload your blood test file (CSV, Excel, TXT)", type=['csv', 'xlsx', 'txt'])

# Step 2: Display Data
if uploaded_file is not None:
    data = load_data(uploaded_file)

    if data is not None:
        st.write("### Uploaded Data")
        st.dataframe(data)  # Display data table

        # Step 3: Visualize the Data
        # Assuming numeric data is in the dataframe and columns represent different blood markers
        numeric_cols = data.select_dtypes(include=['float64', 'int64']).columns.tolist()

        if numeric_cols:
            st.write("### Visualizing Blood Markers")
            selected_marker = st.selectbox('Select a marker to visualize', numeric_cols)

            fig, ax = plt.subplots()
            ax.plot(data[selected_marker], marker='o', linestyle='-')
            ax.set_title(f'{selected_marker} Over Time')
            ax.set_xlabel('Index')
            ax.set_ylabel(selected_marker)

            st.pyplot(fig)
        else:
            st.error("No numeric columns found to visualize.")
else:
    st.info("Please upload a file to proceed.")
