import React, { useEffect } from "react";

import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Cookies from "universal-cookie";
import { useBannerContext } from "@/contexts";

const cookies = new Cookies();

export const SwiperSlideBaner = () => {
  const { banners, getBanners } = useBannerContext();
  useEffect(() => {
    getBanners();
  }, []);

  return (
    <Box overflow="hidden" maxH="96">
      <Swiper loop spaceBetween={10} slidesPerView={3}>
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <Flex mb="1" alignItems="center" justifyContent="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                {item.title || "No existe un título"}
              </Text>
            </Flex>
            <Image w="full" userSelect="none" alt="" src={item.url.replace(/Banner\//, "Banner%2F")} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
