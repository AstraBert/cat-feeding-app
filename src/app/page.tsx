import { createClient } from '@/utils/supabase/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Button,
} from "@/components/ui/button"

import RefreshButton from '@/components/custom/RefreshButton';

async function FeedingTimes() {
  const supabase = await createClient();
  const { data: feedings } = await supabase.from("feedings").select();
  return feedings;
}

export default async function MainPage() {
  const data = await FeedingTimes() ?? [];
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Feeding Times for Puma</h1>
          <RefreshButton />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((dataPoint) => (
            <Card key={dataPoint.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  {new Date(dataPoint.feedingTime).toLocaleDateString()}
                </CardTitle>
                <CardDescription>
                  {new Date(dataPoint.feedingTime).toLocaleTimeString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Quantity:</span>
                    <span className="font-semibold">{dataPoint.quantity}</span>
                  </div>
                  
                  {/* Food Type Checkboxes */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-600">Food Type:</span>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={dataPoint.dryFood} 
                          readOnly
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <label className="text-sm">Dry Food</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={dataPoint.wetFood} 
                          readOnly
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <label className="text-sm">Wet Food</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-600">Notes:</span>
                    <p className="text-sm mt-1 text-gray-800">
                      {dataPoint.additionalNotes || "No additional notes"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Summary Card */}
        <Card className="mt-8 max-w-sm mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Feedings</p>
              <p className="text-2xl font-bold">{data.length}</p>
            </div>
          </CardContent>
        </Card>

        {/* 'Add An Item' button */}
        <div className="max-h-screen flex items-center justify-center p-4">
        <a href="/add">
        <Button>
          Add an Item
        </Button>
        </a>
        </div>
      </div>
    </div>
  )
}