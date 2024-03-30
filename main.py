# TODO(developer): Vertex AI SDK - uncomment below & run
# pip3 install --upgrade --user google-cloud-aiplatform -> Install these before you try to run the code in VSCode terminal
# gcloud auth application-default login

import vertexai
from vertexai.generative_models import GenerativeModel, Part


def generate_text(project_id: str, location: str) -> str:
    # Initialize Vertex AI
    vertexai.init(project="shining-weft-418815", location=location)
    # Load the model
    multimodal_model = GenerativeModel("gemini-1.0-pro-vision")
    # Query the model, give it a prompt
    response = multimodal_model.generate_content(
        [
            # Add an example query
            "Say: Welcome to Diagnosis AI, how can I help you today?",
        ]
    )
    return response.text # returns the output for the prompt 

print(generate_text("shining-weft-418815", "us-central1")) # Prints out the output