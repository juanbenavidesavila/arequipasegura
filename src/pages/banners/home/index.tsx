import React, { Fragment, useEffect } from "react";

import { Card } from "@/layout";
import { WrapperPage } from "@/templates";

import { BannerModal } from "./BannerModal";
import { useBannerContext } from "@/contexts";
import { Divider, Flex, HStack, List, ListItem, Text } from "@chakra-ui/react";
import { MenuBanner } from "./MenuBanner";
import { ShowBanner } from "./ShowBanner";
import { RecordAudio } from "@/components";

export const BannersPage = () => {
  const { getBanners, banners } = useBannerContext();
  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div>
      <WrapperPage title="Banners" breadcrumb={{ routes: ["directories"] }}>
        <Card.Wrapper colSpan={12}>
          <Card.Header
            title="Listado de banners"
            subtitle={`${banners.length} Resultados encontrados`}
            optionsRight={[<BannerModal key="0" />]}
          />
          <Card.Container>
            <Card.Body>
              <List>
                {banners.map((banner, i) => (
                  <Fragment key={banner?.id}>
                    {i !== 0 && <Divider my="3" />}

                    <ListItem>
                      <Flex alignItems="center" justifyContent="space-between">
                        <HStack>
                          <Text fontWeight="semibold">{banner?.title}</Text>
                          <ShowBanner banner={banner} />
                        </HStack>
                        <MenuBanner banner={banner} />
                      </Flex>
                    </ListItem>
                  </Fragment>
                ))}
              </List>
            </Card.Body>
          </Card.Container>
        </Card.Wrapper>
      </WrapperPage>
    </div>
  );
};
