import pytest
import requests

def test_api_call_post_data_positive_case():
    url = "http://localhost:3000/user/"
    data = {"first_name": "Simo", "last_name": "Sorsselsson","email": "joku@ukkeli.ai"}
    headers = {'Content-Type: application/json'}
    response = requests.post(url, json=data)
    assert response.status_code == 200

# sama email address should not be accepted
def test_api_call_post_data_negative_case():
    url = "http://localhost:3000/user/"
    data = {"first_name": "Simo", "last_name": "Sorsselsson","email": "joku@ukkeli.ai"}
    headers = {'Content-Type: application/json'}
    response = requests.post(url, json=data)
    assert response.status_code == 500

def test_api_call_get_data():
    url = "http://localhost:3000/user"
    response = requests.get(url)
    assert response.status_code == 200

def test_api_call_get_single_item():
    url = "http://localhost:3000/user/1"
    response = requests.get(url)
    assert response.status_code == 200
