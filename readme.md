# MOLA Lab Challenge

- The website has been made using React, MongoDB, Express, and Node.js.

- The website has been containerized using docker. The link for it's docker container is available [here](https://hub.docker.com/r/aaryadevnani/mola)

- It is hosted on GCP, and can be viewed [here](https://mola-lab-challenge-dnkwjouc7q-uc.a.run.app/)

- CI/CD has been done via GitHub Actions. Any push to the master branch will generate a new build.

- It supports batch processing of BIBTEX files as requested. Although these files are not being stored as of now. I just read them from the frontend and parse them as JSON in the backend and then input them into the database.
