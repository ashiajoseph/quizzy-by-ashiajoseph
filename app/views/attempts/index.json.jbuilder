# frozen_string_literal: true

json.questions @questions do |question|
    json.extract! question, :id, :question
  end
json.options @options
