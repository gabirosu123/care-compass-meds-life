
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface WeeklyQuestionsProps {
  week: number;
}

export const WeeklyQuestions: React.FC<WeeklyQuestionsProps> = ({ week }) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  const getWeekQuestions = (week: number) => {
    const questions = {
      1: [
        {
          id: 'incorporation',
          text: 'Are you incorporating your medication into your routine?',
          type: 'multiple-choice',
          options: ['Yes', 'No', 'Sometimes']
        }
      ],
      2: [
        {
          id: 'challenging',
          text: 'Do you find it challenging to take your medication regularly?',
          type: 'multiple-choice',
          options: ['Very challenging', 'Somewhat challenging', 'Not challenging']
        },
        {
          id: 'triggers',
          text: 'Think about the triggers you chose to prompt you to take your medication. Are they working?',
          type: 'multiple-choice',
          options: ['Working well', 'Working sometimes', 'Not working']
        }
      ],
      3: [
        {
          id: 'mindfulness',
          text: 'Could mindfulness improve your physical and mental health?',
          type: 'text'
        },
        {
          id: 'knowledge',
          text: 'Knowledge is power. According to your condition, ask your healthcare provider for resources that can help.',
          type: 'text'
        }
      ]
    };
    
    return questions[week as keyof typeof questions] || [];
  };

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const questions = getWeekQuestions(week);

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-slate-600">
            Complete your daily check-ins for this week!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">Weekly Reflection</h3>
      
      {questions.map((question) => (
        <Card key={question.id} className="bg-slate-50">
          <CardContent className="p-4">
            <div className="space-y-3">
              <p className="font-medium text-slate-800">{question.text}</p>
              
              {question.type === 'multiple-choice' && question.options && (
                <RadioGroup
                  value={responses[question.id] || ''}
                  onValueChange={(value) => handleResponseChange(question.id, value)}
                >
                  {question.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                      <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              {question.type === 'text' && (
                <Textarea
                  placeholder="Share your thoughts..."
                  value={responses[question.id] || ''}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  className="min-h-20"
                />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
