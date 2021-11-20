# frozen_string_literal: true

json.report_data @report do |attempt|
    json.title attempt.quiz.title
    json.user_name "#{attempt.user.first_name} #{attempt.user.last_name}"
    json.email attempt.user.email
    json.correct_count attempt.correct_answers_count
    json.incorrect_count attempt.incorrect_answers_count
end
json.display @content
