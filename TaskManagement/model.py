# %%
def read_essay_prompts(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        #Read the entire content of the file
        content = file.read()
        
        #Split the content by two consecutive newline characters
        prompts = content.split('\n\n')
        
        #Strip leading/trailing whitespace and filter out any empty entries
        prompts = [prompt.strip() for prompt in prompts if prompt.strip()]
        
        return prompts

def calculate_prompt_length(prompts):
    #Calculate the number of words in each prompt
    prompt_lengths = [len(prompt.split()) for prompt in prompts]
    return prompt_lengths


prompts = read_essay_prompts('prompts.txt')
print(prompts)
prompt_lengths = calculate_prompt_length(prompts)
print(prompt_lengths)



# %%
import re

def find_word_limits(prompts):
    word_limits = []
    # Regex to capture "word" and "words" with more flexible patterns
    pattern = r'\b(?:word(?:s)?\s+limit|word(?:s)?\s+count|word(?:s)?)\s*:\s*(\d+(?:-\d+)?)\b|(\d+(?:-\d+)?)\s*(?:word(?:s)?\s+limit|word(?:s)?\s+count|word(?:s)?)\b'
    
    for prompt in prompts:
        match = re.search(pattern, prompt, re.IGNORECASE)
        if match:
            # Select the correct group that captured the number or range
            word_limit = match.group(1) if match.group(1) else match.group(2)
            if '-' in word_limit:
                # Split the range and calculate the mean
                lower, upper = map(int, word_limit.split('-'))
                mean_value = (lower + upper) // 2
                word_limits.append(mean_value)
            else:
                # Convert to integer if not a range
                word_limits.append(int(word_limit))
        else:
            word_limits.append(None)
    
    return word_limits


# Extract and print word count limits
word_limits = find_word_limits(prompts)
print(word_limits)



# %%
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords, words
nltk.download('words')
nltk.download('punkt')
nltk.download('stopwords')

def extract_topics(prompts):
    topics = []
    trigger_words = ['discuss', 'conduct','describe', 'explain', 'analyze', 'address', 'consider','show', 'elaborate', 'evaluate', 'illustrate', 'refer to', 'cite']
    stop_words = set(stopwords.words('english'))

    for prompt in prompts:
        sentences = sent_tokenize(prompt)
        topic_sentences = [sentence for sentence in sentences if any(trigger_word in sentence.lower() for trigger_word in trigger_words)]
        keywords = [word for sentence in topic_sentences for word in word_tokenize(sentence) if word.isalnum() and word.lower() not in stop_words]
        topics.append(keywords)

    return topics

keywords = extract_topics(prompts)
english_vocab = set(w.lower() for w in words.words())
stop_words = set(stopwords.words('english'))

def keyword_complexity(keywords):
    complexity_scores = []
    for keyword_list in keywords:
        if not keyword_list:
            complexity_scores.append(0)
            continue
        score = sum(len(keyword) / 10 if keyword.lower() in english_vocab else len(keyword) / 5 for keyword in keyword_list)
        normalized_score = score / len(keyword_list)
        complexity_scores.append(round(min(normalized_score, 1.0), 2))
    return complexity_scores

complexity_scores = keyword_complexity(keywords)
print(complexity_scores)



# %%

def syntactic_complexity(prompt): #Average Sentance Length
    sentences = sent_tokenize(prompt)
    total_length = sum(len(word_tokenize(sentence)) for sentence in sentences)
    num_sentences = len(sentences)
    return total_length / num_sentences if num_sentences else 0
Initial_Prompt_Complexity = []
for prompt in prompts:
    Initial_Prompt_Complexity.append(syntactic_complexity(prompt))
print(Initial_Prompt_Complexity)

# %%
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

time_taken = [22,17,15,22,14,14,15,16,15,15,22,12,13,11,11,19,15,10]
# Create a DataFrame from the lists
data = pd.DataFrame({
    'Essay Word Limit': word_limits,
    'Prompt Length': prompt_lengths,
    'Keyword Complexity': complexity_scores,
    'Initial Prompt Complexity': Initial_Prompt_Complexity,
    'Time Taken': time_taken  # This list needs to exist; it should contain the corresponding time taken for each prompt
})
print(data)
data.to_csv('data.csv', index=False)  # Set index=False to exclude row numbers

# Prepare data
X = data[['Essay Word Limit', 'Prompt Length', 'Keyword Complexity', 'Initial Prompt Complexity']]
y = data['Time Taken']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()

# Train the model
model.fit(X_train, y_train)

# Predict on the testing set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Mean Squared Error:", mse)
print("R^2 Score:", r2)


# %%
import pickle

# Serialize the trained model to a file
with open('time.pkl', 'wb') as file:
    pickle.dump(model, file)


# %%
def process_prompt(prompt):
    """Extract features from the prompt"""
    
    # Calculate prompt length
    prompt_length = len(prompt.split())
    
    # Calculate keyword complexity
    keywords = extract_topics([prompt])
    keyword_complexityy = keyword_complexity(keywords)[0]
    
    # Calculate initial prompt complexity
    initial_prompt_complexity = syntactic_complexity(prompt)
    
    essay_word_limit = find_word_limits([prompt])[0]
    return [essay_word_limit, prompt_length, keyword_complexityy, initial_prompt_complexity]

def predict_time_taken(prompt):
    processed_features = process_prompt(prompt)
    loaded_model = pickle.load(open('time.pkl', 'rb'))
    predicted_time = loaded_model.predict([processed_features])
    return round(predicted_time[0])



