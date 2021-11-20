# frozen_string_literal: true

json.questions @questions do |record|
  json.id record.id
  json.question record.question
end
json.options @options
