import React from 'react'

export const AmazonAffiliate = () => {
  return (
    <section style={{ display: 'flex', flexWrap: 'wrap' }}>
      <p style={{ flexBasis: '100%' }}>
        Amazon Prime offers a streaming service as well as many electronics. Check some of their bestselling products{' '}
        <a
          target='_blank'
          style={{
            textDecoration: 'none',
            color: 'orange',
            fontWeight: 'bolder',
            backgroundColor: '#d3d3d3',
            padding: '5px',
            borderRadius: '10px',
          }}
          href='https://www.amazon.com/b?_encoding=UTF8&tag=sethvb-20&linkCode=ur2&linkId=7a270e88f3458d9b77c3972402935910&camp=1789&creative=9325&node=172282'
        >
          Top 100 electronics
        </a>
      </p>
    </section>
  )
}
