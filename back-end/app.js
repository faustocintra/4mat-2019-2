var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const database = require('./config/database');
database('mongodb://localhost:27017/4mat-2019-2');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const curso = require('./routes/curso');
app.use('/curso', curso);

const professor = require('./routes/professor');
app.use('/professor', professor);

const turma = require('./routes/turma');
app.use('/turma', turma);

const aluno = require('./routes/aluno');
app.use('/aluno', aluno);

const avaliacao = require('./routes/avaliacao');
app.use('/avaliacao', avaliacao);

const nota = require('./routes/nota');
app.use('/nota', nota);

module.exports = app;
