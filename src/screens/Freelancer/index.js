import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Stars from '../../components/Stars';
import FreelancerModal from '../../components/FreelancerModal';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

import {
  Container,
  Scroller,
  FakeSwiper,
  PageBody,
  UserInfoArea,
  ServiceArea,
  TestimonialArea,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
  BackButton,
  LoadingIcon,
  ServiceItem,
  ServiceInfo,
  ServiceTitle,
  ServiceName,
  ServicePrice,
  ServiceChooseBtnText,
  ServiceChooseButton,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
} from './styles';
import Api from '../../Api';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
  });

  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getFreelancerInfo = async () => {
      setLoading(true);
      let json = await Api.getBarber(userInfo.id);
      if (json.error == '') {
        setUserInfo(json.data);
      } else {
        alert('Erro: ' + json.error);
      }
      setLoading(false);
    };
    getFreelancerInfo();
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleServiceChoose = key => {
    setSelectedService(key);
    setShowModal(true);
  };

  return (
    <Container>
      <Scroller>
        <FakeSwiper />
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber={true} />
            </UserInfo>
          </UserInfoArea>
          {loading && <LoadingIcon size="large" color="#000000" />}
          {userInfo.services && (
            <ServiceArea>
              <ServiceTitle>Lista de serviços</ServiceTitle>
              {userInfo.services.map((item, key) => (
                <ServiceItem key={key}>
                  <ServiceInfo>
                    <ServiceName>{item.name}</ServiceName>
                    <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                  </ServiceInfo>
                  <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
                    <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                  </ServiceChooseButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          )}
          {userInfo.testimonials && userInfo.testimonials.length > 0 && (
            <TestimonialArea>
              <Swiper
                style={{height: 110}}
                showsPagination={false}
                showsButtons={true}
                prevButton={
                  <NavPrevIcon width="35" height="35" fill="#000000" />
                }
                nextButton={
                  <NavNextIcon width="35" height="35" fill="#000000" />
                }>
                {userInfo.testimonials.map((item, key) => (
                  <TestimonialItem key={key}>
                    <TestimonialInfo>
                      <TestimonialName>{item.name}</TestimonialName>
                      <Stars stars={item.rate} showNumber={false} />
                    </TestimonialInfo>
                    <TestimonialBody>{item.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          )}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#FFFFFF" />
      </BackButton>

      <FreelancerModal
        show={showModal}
        setShowModal={setShowModal}
        user={userInfo}
        service={selectedService}
      />
    </Container>
  );
};
