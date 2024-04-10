import { Heading, Spinner, Text, VStack } from '@chakra-ui/react'

type PageViewsProps = { totalPageViews: number | undefined }

const PageViews = ({ totalPageViews }: PageViewsProps) => {
  return (
    <VStack w="full" border="1px" borderColor="gray.200" rounded="lg" p={4}>
      <Heading>Total Page Views</Heading>
      <VStack>
        {totalPageViews && (
          <Text fontWeight="bold" fontSize="4xl">
            {totalPageViews}
          </Text>
        )}
        {totalPageViews === undefined && <Spinner size="lg" />}
      </VStack>
    </VStack>
  )
}

export default PageViews
