import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import Typewriter from 'typewriter-effect';

export default function AISuggestionsContainer({ message }) {
  const suggestionsList = message.split('\n').map((item, index) => `${index + 1}. ${item.trim()}`);

  return (
    <div className="rounded-lg shadow-lg bg-white ai-suggs p-4">
      <div className='flex flex-row gap-2'>
        <TipsAndUpdatesTwoToneIcon sx={{ color: '#638763' }} />
        <h2 className="text-xl font-black poppins title-sugg">Breathe Smarter with AI</h2>
      </div>
      <div className="flex flex-row justify-between items-center mt-4">
        <div className="w-2/3">
          <div className="text-lg josefin_sans font-semibold">
            <Typewriter
              onInit={(typewriter) => {
                suggestionsList.forEach((suggestion, index) => {
                  typewriter
                    .typeString(suggestion)
                    .pauseFor(1500)
                    .deleteAll()
                });
                typewriter.start();
              }}
              options={{
                delay: 80,
              }}
            />
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          <img
            src="/misc/warning.jpeg"
            alt="Air Quality Monitoring"
            className="rounded-lg shadow-lg"
            style={{ maxHeight: '150px', maxWidth: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
