from pymed import PubMed

pubmed = PubMed(tool="MyTool", email="disispavank@gmail.")

#returns list of documents relevant to the query published before the specified year
async def filter_year(query, year):
    results = pubmed.query(query, max_results=50)
    sorted_results = sorted(results, key=lambda article: article.publication_date)
    relevant_results = []
    
    for article in sorted_results:
        if (article.publication_date.year >= year):
            relevant_results.append(article)
        else: return relevant_results
    return relevant_results

query_year = 2000
query_text = "cough is a sign of bronchitis"
results = filter_year(query_text, query_year)

from google import genai

client = genai.Client(api_key="AIzaSyDsVPAneWlm2q76DtFHrhxfuj8DM2iEXy8")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain how AI works in a few words",
)

print(response.text)
