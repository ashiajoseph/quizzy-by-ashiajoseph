# frozen_string_literal: true

json.questions @questions.as_json(only: %i[id question])
json.options @options
