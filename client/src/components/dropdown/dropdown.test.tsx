import { Dropdown, DropdownItem, DropdownLabel } from '.'
import { render } from '@testing-library/react'

describe('components/dropdown', () => {
  test('should render the Dropdown component correctly with all of its childs', () => {
    const rendered = render(
      <Dropdown label="This is a label" placeholder="Choose an option" onSelect={() => console.log('some-value')}>
        <DropdownItem value="value-1">Value 1</DropdownItem>
        <DropdownItem value="value-2">Value 2</DropdownItem>
        <DropdownItem value="value-3">Value 3</DropdownItem>
      </Dropdown>,
    )

    expect(rendered.baseElement).toBeInTheDocument()
  })

  test('should render the Dropdown component correctly with all of its childs with a default value', () => {
    const rendered = render(
      <Dropdown
        label="This is a label"
        placeholder="Choose an option"
        defaultValue="value-1"
        onSelect={() => console.log('some-value')}
      >
        <DropdownItem value="value-1">Value 1</DropdownItem>
        <DropdownItem value="value-2">Value 2</DropdownItem>
        <DropdownItem value="value-3">Value 3</DropdownItem>
      </Dropdown>,
    )

    expect(rendered.baseElement).toBeInTheDocument()
  })

  test('should render the Dropdown component correctly with all of its childs with a default value and mapping data from mock array', () => {
    const mockData = [
      { id: 1, title: 'Value 1', value: 'value-1' },
      { id: 2, title: 'Value 2', value: 'value-2' },
      { id: 3, title: 'Value 3', value: 'value-3' },
    ]

    const rendered = render(
      <Dropdown
        label="This is a label"
        placeholder="Choose an option"
        defaultValue="value-1"
        onSelect={() => console.log('some-value')}
      >
        {mockData.map(({ id, title, value }) => (
          <DropdownItem key={id} value={value}>
            {title}
          </DropdownItem>
        ))}
      </Dropdown>,
    )

    expect(rendered.baseElement).toBeInTheDocument()
  })
})
