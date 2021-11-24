# frozen_string_literal: true

json.quiz do
  json.extract! @quiz,
    :title,
    :slug
end
json.questions @questions do |record|
  json.id record.id
  json.question record.question
end

json.options @questions do |question|
  json.array! question.options, :id, :content, :answer

end
