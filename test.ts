const jwt = require("jsonwebtoken")
let payload = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjQsImlhdCI6MTY3Mzg2MDY5MywiZXhwIjoxNjczOTIwNjkzfQ.DCwBuh1_XKiBZIGilC9nLsaQr6R4C3CkFiqpKLsNQ48", "708DD1DC5BC5A169"); 
console.log(payload)