import * as React from 'react'
import { useState, useEffect, FormEvent } from 'react'
import {hot} from 'react-hot-loader'

import {TextAnnotator, TokenAnnotator} from '../../src'

const TEXT = `This could be an argument. Here is a premise. And now a conclusion. This is a second premise. And a third one.`

const BUTTONS = TEXT.split(' ').map(word => {
  return <button>{word}</button>
})

const TAG_COLORS = {
  TAG1: '#00ffa2',
  TAG2: '#84d2ff',
}

const Card = ({children}) => (
  <div
    style={{
      boxShadow: '0 2px 4px rgba(0,0,0,.1)',
      margin: 6,
      maxWidth: 500,
      padding: 16,
    }}
  >
    {children}
  </div>
)

type Highlight = {
  start: number,
  end: number,
  tag?: string
}[]

function ProtoApp() {
  const [highlights, setHighlights] = useState<Highlight | null>([{start: 1, end: 3}])
  const [selectedTag, setTag] = useState<string>('TAG1')
  const handleChange: (value: Highlight) => void =
    function(value: Highlight): void { return setHighlights(value) }
  const handleTagChange: (e: FormEvent<HTMLSelectElement>) => void =
    function(e: FormEvent<HTMLSelectElement>): void { return setTag((event.target as HTMLSelectElement).value) }

  return (
    <div style={{padding: 24, fontFamily: 'IBM Plex Sans'}}>
      <h3 style={{marginTop: 0}}>fork of react-text-annotate</h3>
      <a href="https://github.com/mcamac/react-text-annotate">Github</a>
      <p>Working here on a prototype for highlights linked (toggled on off) by selection of other UI elements</p>
      <div style={{display: 'flex', marginBottom: 24}}>
        <Card>
          <h4>Default</h4>
          <select onChange={handleTagChange} value={selectedTag}>
            <option value="TAG1">TAG1</option>
            <option value="TAG2">TAG2</option>
          </select>
          <TokenAnnotator
            style={{
              fontFamily: 'IBM Plex Sans',
              maxWidth: 500,
              lineHeight: 1.5,
            }}
            tokens={TEXT.split(' ')}
            value={highlights}
            onChange={handleChange}
            getSpan={span => ({
              ...span,
              tag: selectedTag,
              color: TAG_COLORS[selectedTag],
            })}
          />
        </Card>
        <Card>
          {BUTTONS}
        </Card>
      </div>
      <Card>
        <h4>Current Value</h4>
        <pre>{JSON.stringify(highlights, null, 2)}</pre>
      </Card>
    </div>
  )
}

class App extends React.Component<any, any> {
  state = {
    value: [{start: 17, end: 19, tag: 'TAG1'}],
    tag: 'TAG1',
  }

  handleChange = value => {
    this.setState({value})
  }

  handleTagChange = e => {
    this.setState({tag: e.target.value})
  }

  render() {
    return (
      <div style={{padding: 24, fontFamily: 'IBM Plex Sans'}}>
        <h3 style={{marginTop: 0}}>fork of react-text-annotate</h3>
        <a href="https://github.com/mcamac/react-text-annotate">Github</a>
        <p>Working here on a prototype for highlights linked (toggled on off) by selection of other UI elements</p>
        <div style={{display: 'flex', marginBottom: 24}}>
          <Card>
            <h4>Default</h4>
            <select onChange={this.handleTagChange} value={this.state.tag}>
              <option value="TAG1">TAG1</option>
              <option value="TAG2">TAG2</option>
            </select>
            <TokenAnnotator
              style={{
                fontFamily: 'IBM Plex Sans',
                maxWidth: 500,
                lineHeight: 1.5,
              }}
              tokens={TEXT.split(' ')}
              value={this.state.value}
              onChange={this.handleChange}
              getSpan={span => ({
                ...span,
                tag: this.state.tag,
                color: TAG_COLORS[this.state.tag],
              })}
            />
          </Card>
          <Card>
            {BUTTONS}
          </Card>
        </div>
        <Card>
          <h4>Current Value</h4>
          <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
        </Card>
      </div>
    )
  }
}

export default hot(module)(ProtoApp)
