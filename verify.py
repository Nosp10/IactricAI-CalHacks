from pymed import PubMed
pubmed = PubMed(tool="MyTool", email="disispavank@gmail.")
results = pubmed.query("cough is a sign of bronchitis", max_results=50)
sorted_results = sorted(results, key=lambda article: article.publication_date)

query_dict = {}

for article in results:
    query_dict[article.title] = article.abstract
    
print(query_dict)

