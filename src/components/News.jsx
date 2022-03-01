import React, {useState} from 'react';
import {Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';
import { useGetNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const {Text,Title} = Typography;
const {Option} =Select;


const News = ({simplified}) => {
  const {data:cryptosList} = useGetCryptosQuery(100);
  const [newsCategory, setNewsCategory]= useState('Cryptocurrency');
  const {data:cryptoNews, isFetching } =useGetNewsQuery({newsCategory:newsCategory, count:simplified?6:12})
  const newsData = cryptoNews?.value;
  const optionValues = cryptosList?.data?.coins

  if(isFetching) return "Loading.."


  return (
      <Row gutter={[24, 24]}>
        {!simplified && 
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a crypto.."
              optionFilterProp='children'
              onChange={(value) => setNewsCategory(value)}
              filteredOptions={(input,options)=> options.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                  <Option value="Cryptocurrency">Cryptocurrency</Option>
                  {optionValues?.map((value) => (
                    <Option value={value.name}>{value.name}</Option>
                  ))}
            </Select>
            </Col>
        }
            
        
        
        {cryptoNews?.value.map((news, i) => (
              <Col xs={24} sm={12} lg={8} key={i}>
                <Card hoverable className='news-card'>
                    <a href={news.url} target="_blank" rel="noreferrer">
                        <div className="news-image-container">
                          <Title className='news-title' level={4}>{news.name}</Title>
                          <img style={{maxWidth: '200px',maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl} alt="News"/>
                        </div>
                        <p>{news.description > 100
                            ?`${news.description.substring(0,100)}...` : news.description}</p>
                          
                        <div className="provider-container">
                          <div>
                            <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt="news" />
                            <Text className="provider-name">{news.provider[0]?.name}</Text>
                            </div>
                              <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                        </div>
                    </a>
                </Card>
              </Col>
            ))}
      </Row>
  )
}

export default News