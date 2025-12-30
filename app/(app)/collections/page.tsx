'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Folder } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/common/empty-state'
import { createClient } from '@/lib/supabase/client'

interface Collection {
  id: string
  name: string
  description?: string
  prompt_count: number
  created_at: string
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadCollections()
  }, [])

  const loadCollections = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        window.location.href = '/signin'
        return
      }

      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCollections(data || [])
    } catch (error) {
      console.error('Error loading collections:', error)
    } finally {
      setLoading(false)
    }
  }

  const gradients = [
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-pink-500 to-orange-500',
    'from-purple-500 to-pink-500',
    'from-cyan-500 to-blue-500',
  ]

  const hasCollections = collections.length > 0

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              My Collections
            </h1>
            <p className="text-sm text-gray-700">
              Organize and manage your prompt collections
            </p>
          </div>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Collection
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-30 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-5">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : hasCollections ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <Card key={collection.id} hover className="overflow-hidden">
                <div className={`h-30 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}>
                  <Folder className="w-12 h-12 text-white/80" />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-2">{collection.name}</h3>
                  <p className="text-xs text-gray-700 mb-4 line-clamp-2">
                    {collection.description || 'No description'}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    {collection.prompt_count} prompts • Created {new Date(collection.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Folder className="w-16 h-16" />}
            title="No collections yet"
            description="Create a collection to organize your favorite prompts"
            action={{
              label: 'Create Collection',
              onClick: () => {
                // TODO: Open create collection modal
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

