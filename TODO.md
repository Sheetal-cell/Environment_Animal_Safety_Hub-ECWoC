# Quiz Refactor TODO

## Phase 1: Create Base Quiz Class
- [ ] Create `frontend/js/components/quiz-base.js` with BaseQuiz class
- [ ] Extract common methods: startTimer, updateTime, loadQuestion, selectOption, nextQuestion, showResult
- [ ] Add progress persistence methods: saveProgress, loadProgress, clearProgress
- [ ] Add configuration support for quiz-specific settings

## Phase 2: Migrate Animal First Aid Quiz
- [x] Modify `animal-first-aid-quiz.js` to extend BaseQuiz
- [x] Create config object with questions, time limit, icons, progress key
- [x] Remove duplicated code, keep only quiz-specific overrides
- [x] Test functionality

## Phase 3: Migrate Other Quizzes (Future)
- [ ] Migrate `waste-management-quiz.js`
- [ ] Migrate `environment-awareness-quiz.js`
- [ ] Migrate remaining quiz files
- [ ] Update any shared dependencies

## Phase 4: Testing & Cleanup
- [ ] Test all migrated quizzes
- [ ] Remove old duplicated code
- [ ] Update documentation
