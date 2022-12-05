List of TODOs:

- [x] Utility functions to read compressed files from `data` folder and output the input JSON object
  - [x] Un-compress file to JSON
- [x] Utility function to transform input JSON object into proper structure
  - [x] Transform URL into it's parts (domain, path, query, hash)
  - [x] Loop through event array and create a new object
- [x] Utility function to connect to MongoDB using a client
- [x] Utility function to upload transformed files to MongoDB through the client
- [x] Configure server to read from input data, transform JSON input, and upload to MongoDB
