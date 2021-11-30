# frozen_string_literal: true

json.quizzes @quizzes do |quiz|
  json.id quiz.id
  json.title quiz.title
end
