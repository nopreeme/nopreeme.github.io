import os
import json
import requests
from msal import ConfidentialClientApplication

# --- Configuration ---
TENANT_ID = os.environ.get("AZURE_TENANT_ID")
CLIENT_ID = os.environ.get("AZURE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("AZURE_CLIENT_SECRET")
FORM_ID = "YnZjRo8WZEKQyEvpQHdiHfvIT55TnedEhEDR5kd4f1tUQkExVFJKSzlGN05BSloyTkpFQUlSVlpSNC4u" # Your Microsoft Form ID

AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
SCOPE = ["https://graph.microsoft.com/.default"]
GRAPH_API_ENDPOINT = "https://graph.microsoft.com/v1.0"

# --- Authentication ---
def get_access_token():
    app = ConfidentialClientApplication(
        client_id=CLIENT_ID,
        client_credential=CLIENT_SECRET,
        authority=AUTHORITY
    )
    result = app.acquire_token_for_client(scopes=SCOPE)
    if "access_token" in result:
        return result["access_token"]
    else:
        raise Exception(f"Could not obtain access token: {result.get('error_description', 'No error description')}")

# --- Fetch Form Responses ---
def get_form_responses(access_token, form_id):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    # This endpoint gets all responses for a form
    # You might need to adjust this if your form has multiple pages or complex questions
    response_url = f"{GRAPH_API_ENDPOINT}/forms/{form_id}/responses"
    
    responses = []
    while response_url:
        response = requests.get(response_url, headers=headers)
        response.raise_for_status() # Raise an exception for HTTP errors
        data = response.json()
        responses.extend(data.get("value", []))
        response_url = data.get("@odata.nextLink") # For pagination
    return responses

# --- Process Responses and Generate HTML ---
def process_form_responses(responses):
    # This is a simplified processing.
    # It assumes the first question in the form responses contains the intern's name.
    # You might need to adjust 'questionId' based on your form's actual structure.
    
    intern_votes = {}
    
    for response in responses:
        answers = response.get("answers", {})
        # Iterate through answers to find the relevant question
        for question_id, answer_data in answers.items():
            # Assuming the 'value' field contains the intern's name
            # You might need to inspect your form's JSON response to find the correct key
            # For example, if it's a choice question, the value might be in 'value' or 'text'
            if 'value' in answer_data:
                try:
                    # Attempt to parse the value as JSON, as some form answers are JSON strings
                    answer_value = json.loads(answer_data['value'])
                    # If it's a choice question, the actual answer might be in 'answer1' or similar
                    if isinstance(answer_value, dict) and 'answer1' in answer_value:
                        intern_name = answer_value['answer1']
                    else:
                        intern_name = str(answer_value)
                except json.JSONDecodeError:
                    intern_name = answer_data['value'] # Not JSON, just a string
                
                intern_votes[intern_name] = intern_votes.get(intern_name, 0) + 1
                break # Assuming one intern vote per response for simplicity

    total_votes = sum(intern_votes.values())
    
    # Sort interns by votes in descending order
    sorted_interns = sorted(intern_votes.items(), key=lambda item: item[1], reverse=True)

    html_content = """
    <div class="space-y-4 max-w-md mx-auto">
        <h3 class="text-xl font-semibold mb-4">Voting Breakdown</h3>
    """

    for intern_name, votes in sorted_interns:
        percentage = (votes / total_votes) * 100 if total_votes > 0 else 0
        html_content += f"""
        <div class="text-left">
            <div class="flex justify-between mb-1"><span class="font-medium">{intern_name}</span><span class="text-gray-600">{percentage:.1f}%</span></div>
            <div class="w-full bg-gray-200 rounded-full h-4"><div class="brand-bg-blue h-4 rounded-full" style="width: {percentage:.1f}%"></div></div>
        </div>
        """

    html_content += """
    </div>
    """
    return html_content

# --- Update HTML File ---
def update_results_page(generated_html, results_html_path):
    with open(results_html_path, mode='r', encoding='utf-8') as f:
        results_page_content = f.read()

    start_tag = "<div id=\"survey-results-content\">"
    end_tag = "</div>"

    start_index = results_page_content.find(start_tag)
    end_index = results_page_content.find(end_tag, start_index + len(start_tag))

    if start_index != -1 and end_index != -1:
        new_results_page_content = \
            results_page_content[:start_index + len(start_tag)] + \
            generated_html + \
            results_page_content[end_index:]
    else:
        raise Exception("Error: Could not find survey-results-content placeholder in results.html")

    with open(results_html_path, mode='w', encoding='utf-8') as f:
        f.write(new_results_page_content)

# --- Main Execution ---
if __name__ == "__main__":
    try:
        print("Starting script to update Microsoft Forms results...")
        access_token = get_access_token()
        print("Access token obtained.")
        
        responses = get_form_responses(access_token, FORM_ID)
        print(f"Fetched {len(responses)} responses from form.")
        
        if not responses:
            print("No responses found. Skipping HTML generation.")
            # Optionally, you could generate a "No results yet" message
            update_results_page("<p>No survey results available yet.</p>", "./results.html")
        else:
            generated_html = process_form_responses(responses)
            update_results_page(generated_html, "./results.html")
            print("results.html updated successfully.")
            
    except Exception as e:
        print(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()
        exit(1) # Exit with a non-zero code to indicate failure