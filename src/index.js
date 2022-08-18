
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Who Wants To be a Millionaire?')
    await sleep();
    rainbowTitle.stop()
    console.log(`${chalk.bgBlue('HOW TO PLAY')}
    Im a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...
    `)
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player'
        },
    })
    playerName = answers.player_name
}


async function question1() {
    await sleep()
    console.clear()
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'When Michael Jackson was died?\n',
        choices: [
            '25 jun, 2009',
            '25 may, 2009',
            '24 jun, 2009',
            '20 jul, 2009',
        ]
    })
    return handleAnswer(answers.question_1 == '25 jun, 2009')
}

async function question2() {
    console.clear()
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: `What is Michael Jackson's first song?`,
        choices: [
            `Dont Stop Til You Get Enough`,
            `Thriller`,
            `Billie Jean`,
            `Blues Away`,
            `Man In The Mirror`,
        ]
    })
    return handleAnswer(answers.question_2 == 'Blues Away')
}

async function question3() {
    console.clear()
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'When Michael Jackson was born?',
        choices : [
            '29 Aug, 1957',
            '27 Jul, 1952',
            '21 Aug, 1957',
            '22 Jul, 1955',
        ]
    })
    return handleAnswer(answers.question_3 == '29 Aug, 1957')
}

async function question4() {
    console.clear()
    const answer = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'When Eminem starts rapping?',
        choices: [
            'In 1991',
            'In 1984',
            'In 1988',
            'in 1987',
        ]
    })
    return handleAnswer(answer.question_4 == 'In 1988')
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Cheking answer...').start()
    await sleep()
    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's a correct answer`})
    } else {
        spinner.error({ text: `Wrong answer ${playerName}. Killing your pc...💀💀💀`})
        process.exit(0)
    }
}

function winner() {
    console.clear()
    const msg = `Congrats, ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data))
    })
}

await welcome()
await askName()
await question1()
await question2()
await question3()
await question4()
await winner()