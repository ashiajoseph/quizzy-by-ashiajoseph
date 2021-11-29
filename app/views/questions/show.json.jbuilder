# frozen_string_literal: true

json.question_answer do
  json.extract! @question,
    :id,
    :question
  json.options @options do |option|
    json.extract! option, :id, :content, :answer
  end
end
