// This whole file is fked. Refactor it when ya get a chance.
// Everything works perfectly, it's just messy -- am new to chart.js
import { VStack, Heading, HStack, Text, Spinner } from '@chakra-ui/react'
import { GetTimeSeriesDataReturnData } from 'controllers/analytics'

import TimeSeriesChart from './TimeSeriesChart'

type TimeSeriesProps = { timeSeries: GetTimeSeriesDataReturnData | undefined }

const TimeSeries = ({ timeSeries }: TimeSeriesProps) => {
    return (
      <VStack
        align="left"
        w="full"
        border="1px"
        borderColor="gray.200"
        rounded="lg"
        p={4}
        spacing={4}
      >
        <Heading fontSize="2xl">Total Views Over Time</Heading>
        {!timeSeries && (
          <VStack>
            <Spinner size="lg" />
          </VStack>
        )}
        {timeSeries && timeSeries.length === 0 && (
          <HStack w="full" border={1} borderColor="gray.200" borderStyle="dashed" p={4} rounded="lg">
            <Text fontWeight="semibold" fontSize="sm">
              No views yet!
            </Text>
          </HStack>
        )}
        {timeSeries && timeSeries.length > 0 && (
          <TimeSeriesChart timeSeries={timeSeries} />
        )}
      </VStack>
    )
}

export default TimeSeries
