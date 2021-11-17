# frozen_string_literal: true

json.qa do
  json.extract! @question,
    :id,
    :question
  json.options @options do |opt|
    json.extract! opt, :id, :content, :answer
  end
end
