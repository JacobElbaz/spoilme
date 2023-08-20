# SpoilMe Project

## Introduction

As part of my project, I developed artificial intelligence that aims to predict the likely ending of a movie in a human-like manner. To achieve this goal, I used the GPT-3 artificial intelligence model, a trendy technology, and adapted it to our needs using a fine-tuning technique. I fed this model a database of over 1000 sets containing movie synopses and key plot elements, which are not revealed in the synopsis itself (spoilers).

## NLP

As humans, we can understand the meaning of a sentence and create others thanks to our experience. Our brain creates relationships between words to deduce a logical meaning. It’s a big challenge for the machine to succeed in these tasks where the most difficult task is to extract the global context from a sentence. NLP is a discipline that focuses on the understanding, manipulation, and generation of natural language by machines. Story generation is an extremely challenging task in the field of NLP. It consists of creating a story according to context. Our main issues were representing the context clues that contain key information for planning a reasonable ending. Our solution was GPT 3.

## Model Description

### Why GPT-3?

- Most advanced NLP model in the industry*.
- GPT-3 uses a specific type of neural network architecture called a transformer. Transformers are designed to handle sequences of tokens and capture the relationships between them effectively. This helps the model capture long-range dependencies and context in the text.

### Fine-tuning

- Fine-tuning is a process where the GPT-3 is further trained on specific tasks or datasets to make it more specialized and accurate. During fine-tuning, the model's parameters are adjusted based on task-specific data to optimize its performance. This allows GPT-3 to adapt its learned knowledge to better suit specific applications like predicting movie endings, enhancing its capabilities in those areas.

## Application Technologies

### ReactJS

I utilized React, a JavaScript library created by Facebook, in the development of the application. My decision to opt for React was based on my existing familiarity with it and its up-to-date nature.

### OpenAI API

In order to integrate our AI model into the application, I leveraged the OpenAI API. This API provided me with the capability to send prompts to my model directly from the application and receive the corresponding results seamlessly within the application itself.

### Online Movie Database API

In the application, I utilize an API that enables me to retrieve original synopses for different movies directly. This API allows me to search for a movie based on its title and retrieve comprehensive information about it, including pictures and synopses, which are then seamlessly integrated into the application.

## Workflow

### 1 - Find Movie Dataset

Thanks to Kaggle, I discovered a dataset containing approximately 1700 films, including their synopses, id, and other information directly extracted from IMDb but not the movie title.

### 2 - Data Scraping

MoviePooper is a website that provides movie spoilers. I utilized Octoparse, a data scraping tool, to extract information from this website. Specifically, I collected data on nearly 1000 films, including their titles and corresponding spoilers.

### 3 - Merging Datasets

I used Python to manipulate the data and merge the datasets. I had to make sure that both datasets had a similar column structure.

### 4 - Cleaning Data

I used Notepad++ to refine and prepare the data. This involved eliminating duplicates, handling missing data, and standardizing formats. I also removed unnecessary columns, shortened synopses and spoilers, removed author names, renamed columns, and eliminated HTML code from the scraped data.

### 5 - Fine Tuning

Once the data was prepared, I used the OpenAI CLI by providing my dataset as a JSONL file to create my fine-tuned model.

## Expectation

My initial expectations were modest, with an anticipated accuracy rate of only 20% when consulting our model. It is important to recognize and acknowledge the inherent complexity involved in predicting the conclusion of a film. Filmmakers deliberately construct narratives that aim to astonish and engage audiences, often incorporating unexpected plot twists and turns. The inherent complexity of predicting film endings necessitates a realistic outlook, understanding that the task is inherently challenging for both humans and artificial intelligence.

## Test

To test my fine-tuned model, I evaluated its performance on a separate test set (430 synopses) that is distinct from the data used for fine-tuning. This is important to ensure that the model can generalize well to new, unseen data. Due to the lack of an automated method to verify the accuracy of spoilers, I had to assess them manually by reviewing each output and assigning a score based on the proportion of true sentences to the total number of sentences in the output. The score is determined by dividing the number of true sentences by the total number of sentences in the output. The model's overall score was computed as the average of all the individual input scores. After testing, we obtained an accuracy of 12%.
