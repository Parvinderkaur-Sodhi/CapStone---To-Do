const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const tasks = {
    day: [],
    work: [],
};

app.get('/', (req, res) => {
    res.render('index.ejs', { tasks });
});

app.post('/addTask', (req, res) => {
    const { task, list } = req.body;
    tasks[list].push(task);
    res.redirect('/');
});

app.post('/completeTask', (req, res) => {
    const { task, list } = req.body;
    const index = tasks[list].indexOf(task);
    if (index !== -1) {
        tasks[list][index] = tasks[list][index].startsWith('<s>') ? task.slice(3, -4) : `<s>${task}</s>`;
    }
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
