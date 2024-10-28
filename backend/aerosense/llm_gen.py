from langchain.prompts import PromptTemplate
from optimum.intel import OVModelForCausalLM
from transformers import AutoTokenizer

def getLLamaResponse(input_number, city, station):
    model_id = "meta-llama/Llama-2-7b-chat-hf"
    model = OVModelForCausalLM.from_pretrained(model_id)
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    template = """
    You're a skilled pollution control advisor with extensive experience in providing actionable recommendations based on air quality metrics. 
    Your expertise lies in interpreting the Air Quality Index (AQI) data (Use CPCB air quality standard) and suggesting appropriate measures to mitigate pollution levels effectively.
    Based on the information of {input_number} Air Quality Index (AQI) to assess the situation and provide specific actions that should be taken by 
    {station} of the {city} as an expertise in interpreting the Air Quality Index data using CPCB air quality standard. Highlight the seriousness of the pollution issue 
    reflected by the AQI value, detailing the recommended actions that are relevant to the situation for the specified city. Based on the given AQI suggest both immediate and long-term 
    strategies for improvement. Overall give your content in less than or equal to 100 words.
    """
    prompt = PromptTemplate(input_variables=["station", "input_number", "city"], template=template).format(station=station, input_number=input_number, city=city)
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=100)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return response
