import React, { useState } from "react"
import "./App.css"

function App() {
  const [text, setText] = useState("")
  const [isEmpty, setEmpty] = useState(false)
  const [textMess, setTextMess] = useState("Поле ввода не может быть пустой")
  const [textDirty, setDirty] = useState(false)
  const [butErr, setButErr] = useState(true)
  const [textArr, setTextArr] = useState([])

  const textHandler = (e) => {
    setText(e.target.value)
    if (e.target.value) {
      setTextMess("")
      setDirty(true)
      setEmpty(false)
      setButErr(false)
    }
    if (!e.target.value) {
      setTextMess("Поле ввода не может быть пустой")
      setEmpty(true)
      setButErr(true)
    }
  }

  const bluerHandler = (e) => {
    if (text === "") {
      setDirty(true)
      setButErr(true)
      setTextMess("Поле ввода не может быть пустой")
    } else {
      setTextMess("")
      setButErr(false)
    }
  }

  const getText = () => {
    setTextArr([
      ...textArr,
      {
        text: text,
      },
    ])
    setButErr(false)
    console.log(text)
    setTextMess("Успешно добавлен")
    setText("")
    setEmpty(true)
  }

  const delElement = (id) => {
    setTextArr(
      textArr.filter((item, index) => {
        if (id === index) {
          setButErr(false)
          setTextMess("Успешно удалено")
          return false
        }
        return true
      })
    )
  }

  return (
    <>
      <div className="form">
        <div className="header">
          <form onClick={(e) => e.preventDefault()}>
            <div className="form-top">
              <input
                onBlur={(e) => bluerHandler(e)}
                placeholder="Введите текст..."
                type="text"
                value={text}
                onChange={(e) => textHandler(e)}
              />
              <button
                disabled={isEmpty}
                type="submit"
                onClick={(e) => getText()}
              >
                Отправить
              </button>
            </div>

            {textDirty && textMess && (
              <div className={`${butErr === true ? "is-error" : "no-error"}`}>
                {textMess}
              </div>
            )}
          </form>
          <div className="main">
            {textArr.map((item, id) => {
              return (
                <div className="text-item">
                  {item.text}
                  <button onClick={(e) => delElement(id)}>✖</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
