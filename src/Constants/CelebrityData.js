import apj from "../assets/Images/apj.png";
import billGates from "../assets/Images/billGates.png";
import einstein from "../assets/Images/einstein.png";
import nelsonMandela from "../assets/Images/nelsonMandela.png";
import steveJobs from "../assets/Images/steveJobs.png";

const celebrities = [
    {
        image: apj, 
        title: `APJ Abdul Kalam`,
        description: `If you fail, never give up because FAIL means "First Attempt In Learning"`, 
        slideNumber: 1, 
    },
    {
        image: billGates, 
        title: `BillGates`,
        description: "The belief that the world is getting worse, that we can't solve extreme poverty and disease, isn't just mistaken.", 
        slideNumber: 2, 
    },
    {
        image: einstein, 
        title: `Albert Einstein`,
        description: "We cannot solve our problems with the same thinking we used when we created them. ...", 
        slideNumber: 3, 
    },
    {
        image: nelsonMandela, 
        title: `Nelson Mandela`,
        description: "Education is the most powerful weapon which you can use to change the world.", 
        slideNumber: 4, 
    },
    {
        image: steveJobs, 
        title: `Steve Jobs`,
        description: "Innovation distinguishes between a leader and a follower.", 
        slideNumber: 5, 
    },
]

export default celebrities;