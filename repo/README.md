### 1. What's the goal of our RAG process?

We're creating a process that pulls files from any Github repo so anyone can quickly interact with any repo.  We'll provide a dropdown with our default repos, and a field for entering new repos.

### 2. How will the RAG system be used in the home repo?

The home repo is being designed to explore progress toward UN Goals and environmental impact data visualization. Parameters will allow anyone to customize the content of the home page by setting locations and topics.

One of the parameters will be the path to the GitHub repo containing the RAG training material to use within the home page.

### 3. How are users going to use the RAG model?

We'll have default prompts. Each RAG model will also generate questions that relate to the unique data in the model - to provide the user with links about the data.

### 4. How are users going to initiate the requests?

A #prompt input field will allow the user to converse with the model. Clicking the default prompts will send them to the #prompt field as well.
