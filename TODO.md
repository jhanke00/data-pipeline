List of TODOs:

- [ ] Utility function to read compressed files from `data` folder and output JSON object
- [ ] Utility function to transform input JSON object into proper structure
  - [ ] Transform URL into it's parts (domain, path, query, hash)
  - [ ] Loop through event array and create a new object
- [x] Utility function connect to MongoDB using a client
- [ ] Utility function to upload transformed files to MongoDB through the client
- [ ] Configure server to read from input data, transform JSON input, and upload to MongoDB
