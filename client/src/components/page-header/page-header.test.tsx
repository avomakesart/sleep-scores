import { render } from '@testing-library/react'
import { PageHeader } from '.'
import { Button } from '../button'
import { BackArrow } from '../icons'

describe('components/page-header', () => {
  test('should render the page header correctly as default', () => {
    const rendered = render(
      <PageHeader>
        <button>Hello world</button>
      </PageHeader>,
    )

    expect(rendered.baseElement).toBeInTheDocument()
  })

  test('should render the page header correctly using all of its props', () => {
    const props = {
      justify: 'space-between',
      spaceTop: '1rem',
      spaceBottom: '1rem',
      spaceLeft: '2rem',
      spaceRight: '3rem',
      className: 'some-extra-classname',
      children: (
        <>
          <span>
            <BackArrow width="1.3em" />
          </span>
          <div>
            <Button onClick={() => console.log('hello world')}>Hello world</Button>
          </div>
        </>
      ),
    }

    const rendered = render(<PageHeader {...props} />)

    expect(rendered.baseElement).toBeInTheDocument()
  })
})
