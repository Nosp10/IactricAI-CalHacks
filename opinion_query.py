import requests


async def get_doctors(zip_cde, specialty):
    url = "https://npiregistry.cms.hhs.gov/api/"
    params = {
        "version": "2.1",
        "postal_code": zip_cde,
        "taxonomy_description": specialty,
        "pretty": "on"
    }

    response = requests.get(url, params=params)
    data = response.json()
    results = data.get("results", [])

    for provider in results:
        basic = provider.get("basic", {})
        name = f"{basic.get('first_name', '')} {basic.get('last_name', '')}".strip()
        if not name:
            name = basic.get("organization_name", "Unknown Provider")
            taxonomy_list = provider.get("taxonomies", [])
            specialty = taxonomy_list[0]["desc"] if taxonomy_list else "Unknown Specialty"

        addresses = provider.get("addresses", [])
        loc_address = next((a for a in addresses if a["address_purpose"] == "LOCATION"), {})
        address_str = f"{loc_address.get('address_1', '')}, {loc_address.get('city', '')}, {loc_address.get('state', '')} {loc_address.get('postal_code', '')}"
        print(f"{name} ({specialty}) — {address_str}")

        return_dict = {
            "name": name,
            "specialty": specialty,
            "address": address_str
        }
        
        return return_dict