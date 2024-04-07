## Setup and run instructions

Install the requirements into a virtualenv or your environment of choice. Python 3 needs to be installed.

    pip install -r requirements.txt

which includes
* pytest
* requests

Make sure that app and postgres containers are up and running.
then run one of following commands (depending of your OS and setup):

```python3 -m pytest test_routes.py```

OR

```pytest test_routes.py```


