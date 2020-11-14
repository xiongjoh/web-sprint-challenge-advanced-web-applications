import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import {fetchColors as mockFetchColors} from '../api/fetchColors'

jest.mock('../api/fetchColors.js')

const results = {
  data: [
    {color: "blue", code: {hex: '#f0f8ff'}, id: 1},
    {color: "limegreen", code: {hex: '#99ddbc'}, id: 2},
    {color: "aqua", code: {hex: '#00ffff'}, id: 3}
  ]
}

test("Fetches data and renders the bubbles", async () => {
  // Finish this test
  mockFetchColors.mockResolvedValueOnce(results)

  render(<BubblePage />)

  // no color names should be displaying
  const color1 = screen.queryByText(/blue/i)
  expect(color1).not.toBeInTheDocument()
  const color2 = screen.queryByText(/green/i)
  expect(color2).not.toBeInTheDocument()
  const color3 = screen.queryByText(/aqua/i)
  expect(color3).not.toBeInTheDocument()

  // sections names should display
  const bubbleText = screen.queryByText(/bubble/i)
  expect(bubbleText).toBeInTheDocument()
  
  // no circles should be dislpaying
  const circles = screen.queryAllByTestId('circle')
  expect(circles).toHaveLength(0)

  //wait for api to load
  await waitFor(() => {
    // colors are rendering
    const color2 = screen.queryByText(/green/i)
    expect(color2).toHaveTextContent('limegreen')

    const color3 = screen.queryByText(/aq/i)
    expect(color3).toBeInTheDocument()
    expect(color3).toHaveTextContent('aqua')

    // Circles are rendering
    const circles = screen.queryAllByTestId('circle')
    expect(circles).toHaveLength(3)
  })

});
