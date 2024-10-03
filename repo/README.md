### 1. What's the goal of our RAG process?

We're creating a process that pulls files from any Github repo so anyone can quickly interact with any repo.  We'll provide a dropdown with our default repos, and a field for entering new repos.

### 2. How will the RAG system be used in the home repo?

The home repo is being designed to explore progress toward UN Goals and environmental impact data visualization. Parameters will allow anyone to customize the content of the home page by setting locations and topics.

One of the parameters will be the path to the GitHub repo containing the RAG training material to use within the home page.

### 3. How are users going to use the RAG model?

Each RAG model will be used to generate starter prompts that relate to the unique data in the model. The starter prompts will be informative. Example: "This model focuses on topics related to water purification using three tecniques. Learn more."

### 4. How are users going to initiate the requests?

A #prompt input field will allow the user to converse with the model. Clicking the default starter prompts will send each pre-generated prompt into the #prompt field to pull more details from the model.
