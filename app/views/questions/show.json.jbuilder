json.qa do
   json.extract! @question,
     :id,
     :question
   json.options @options
end