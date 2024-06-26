'use client'

import { Avatar, Card, Flex, Text } from "@radix-ui/themes"
import Link from "next/link"
import { useEffect } from "react"
import ReactMarkdown from "react-markdown"

export default function Checker({data}: {data: any}) {


    return(
        <div>
            <Flex direction="column" gap="4">
                {data.map((request: any) => (
                <Card key={request.id} className="prose max-w-full" mt="4">
                    <Flex gap="4" direction="column">
                    <Flex gap="2">
                        <Link
                        href={`/users/${request.id}`}
                        >
                        <Avatar
                            src={request.image!}
                            fallback="?"
                            size="2"
                            radius="full"
                            className="cursor-pointer"
                            referrerPolicy="no-referrer"
                        />
                        </Link>
                        <Text>{request.name} ({request.email})</Text>
                    </Flex>
                    <Flex gap="2">
                        <Text>Оценка:</Text>
                        <Text>{request.eval} / 5</Text>
                    </Flex>
                    </Flex>
                    <ReactMarkdown>{request.description}</ReactMarkdown>
                </Card>
                ))}
            </Flex>
        </div>
    )
}