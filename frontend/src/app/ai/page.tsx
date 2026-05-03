import { Textarea } from "@/components/ui/textarea"
import { auth } from "@/lib/auth"

const AIPage = async () => {
    const user = await auth();
    const greetings = [
        "Kon'nichiwa",
        "Hello",
        "Ohayou gozaimasu",
        "Good Morning",
        "Moshi moshi",
        "Hello",
        "Hiyaaa",
        "Heyaaa",
        "Yo",
        "Hi",
        "Ohisashiburi desu",
        "Long time no see",
    ]

    const aiPlaceholders = [
        "Pent up frustration? I'm all ears...",
        "Business in ruin? My peers have built a nation, from SCRATCH...",
        "Got ditched? Just move on...",
        "Dive in e-commerce, it is the future...",
        "You didn't has money to get along? Lets earn something...",
        "Get yourself some damn $$",
        "Got betrayed? I'm your loyal...",
    ]

    return (
        <div className="w-full min-h-screen flex items-center justify-center -mt-12">
            <div className="min-w-xl flex items-center flex-col gap-8">
                <div className="px-4 w-full flex items-center justify-start gap-0 text-4xl font-medium italic">
                    <h1>{greetings[Math.floor(Math.random() * 12)]}</h1>
                    <h1>, {user?.firstName}!</h1>
                </div>
                <Textarea
                    className="bg-[#23272c]/5 min-h-30 max-h-30 text-lg! p-4 border-2 border-border backdrop-blur-2xl appearance-none!"
                    placeholder={aiPlaceholders[Math.floor(Math.random() * 7)]}
                />
            </div>
        </div>
    )
}

export default AIPage
